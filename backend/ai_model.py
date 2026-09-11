
import os
import cv2
import torch
import torch.nn as nn
import timm

from albumentations import Compose, Normalize, Resize
from albumentations.pytorch import ToTensorV2

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image


# ==================================================
# DEVICE
# ==================================================

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# ==================================================
# CLASS LABELS
# ==================================================

class_labels = {
    0: "No DR",
    1: "Mild DR",
    2: "Moderate DR",
    3: "Severe DR",
    4: "Proliferative DR"
}


# ==================================================
# MODEL ARCHITECTURE
# ==================================================

class EfficientNetModel(nn.Module):

    def __init__(self, num_classes=5):

        super().__init__()

        self.model = timm.create_model(
            "efficientnet_b0",
            pretrained=False
        )

        in_features = self.model.classifier.in_features

        self.model.classifier = nn.Sequential(
            nn.Linear(in_features, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):

        return self.model(x)


# ==================================================
# LOAD PRETRAINED MODEL
# ==================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model",
    "best_model_fold_3.pth"
)

if not os.path.exists(MODEL_PATH):

    raise FileNotFoundError(
        f"Model file not found: {MODEL_PATH}"
    )


model = EfficientNetModel(
    num_classes=5
).to(device)


state_dict = torch.load(
    MODEL_PATH,
    map_location=device
)

model.load_state_dict(state_dict)

model.eval()


print("AI model loaded successfully!")
print("Device:", device)


# ==================================================
# IMAGE PREPROCESSING
# ==================================================

transform = Compose([

    Resize(384, 384),

    Normalize(
        mean=(0.485, 0.456, 0.406),
        std=(0.229, 0.224, 0.225)
    ),

    ToTensorV2()
])


# ==================================================
# PREDICT DIABETIC RETINOPATHY
# ==================================================

def predict_dr(image_path):

    # ----------------------------------------------
    # 1. READ IMAGE
    # ----------------------------------------------

    img = cv2.imread(image_path)

    if img is None:

        raise ValueError(
            "Image could not be loaded"
        )


    # ----------------------------------------------
    # 2. BGR → RGB
    # ----------------------------------------------

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )


    # ----------------------------------------------
    # 3. PREPROCESS IMAGE
    # ----------------------------------------------

    processed = transform(
        image=img
    )

    image_tensor = processed[
        "image"
    ].unsqueeze(0).to(device)


    # ----------------------------------------------
    # 4. AI PREDICTION
    # ----------------------------------------------

    with torch.no_grad():

        outputs = model(
            image_tensor
        )

        probabilities = torch.softmax(
            outputs,
            dim=1
        )


    predicted_class = probabilities.argmax(
        dim=1
    ).item()


    confidence = probabilities.max(
        dim=1
    ).values.item()


    prediction = class_labels[
        predicted_class
    ]


    # ----------------------------------------------
    # 5. AI NOT SURE
    # ----------------------------------------------

    uncertain = confidence < 0.60


    # ----------------------------------------------
    # 6. GRAD-CAM
    # ----------------------------------------------

    targets = [

        ClassifierOutputTarget(
            predicted_class
        )

    ]


    target_layers = [

        model.model.conv_head

    ]


    cam = GradCAM(

        model=model,

        target_layers=target_layers

    )


    grayscale_cam = cam(

        input_tensor=image_tensor,

        targets=targets

    )[0]


    # ----------------------------------------------
    # 7. PREPARE ORIGINAL IMAGE
    # ----------------------------------------------

    original = cv2.resize(

        img,

        (384, 384)

    )


    original = (
        original.astype("float32")
        / 255.0
    )


    # ----------------------------------------------
    # 8. CREATE GRAD-CAM OVERLAY
    # ----------------------------------------------

    visualization = show_cam_on_image(

        original,

        grayscale_cam,

        use_rgb=True

    )


    # ----------------------------------------------
    # 9. CREATE RESULTS FOLDER
    # ----------------------------------------------

    results_dir = os.path.join(

        os.path.dirname(__file__),

        "results"

    )


    os.makedirs(

        results_dir,

        exist_ok=True

    )


    # ----------------------------------------------
    # 10. SAVE GRAD-CAM IMAGE
    # ----------------------------------------------

    gradcam_filename = (
        "gradcam_result.jpg"
    )


    gradcam_path = os.path.join(

        results_dir,

        gradcam_filename

    )


    cv2.imwrite(

        gradcam_path,

        cv2.cvtColor(

            visualization,

            cv2.COLOR_RGB2BGR

        )

    )


    # ----------------------------------------------
    # 11. RETURN RESULT
    # ----------------------------------------------

    result = {

        "prediction": prediction,

        "confidence": round(
            confidence * 100,
            2
        ),

        "uncertain": uncertain,

        "predicted_class": predicted_class,

        "gradcam_path": gradcam_path

    }


    return result
 