
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
import os
import shutil

from ai_model import predict_dr


# ==================================================
# FASTAPI APP
# ==================================================

app = FastAPI(
    title="EYE SCREEN API"
)


# ==================================================
# CREATE FOLDERS
# ==================================================

os.makedirs("temp", exist_ok=True)
os.makedirs("results", exist_ok=True)


# ==================================================
# SERVE GRAD-CAM IMAGES
# ==================================================

app.mount(
    "/results",
    StaticFiles(directory="results"),
    name="results"
)


# ==================================================
# HOME
# ==================================================

@app.get("/")
def home():

    return {
        "message": "EYE SCREEN API is running"
    }


# ==================================================
# PREDICT
# ==================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # ----------------------------------------------
    # Save uploaded image
    # ----------------------------------------------

    image_path = os.path.join(
        "temp",
        file.filename
    )

    with open(
        image_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )


    # ----------------------------------------------
    # Run AI
    # ----------------------------------------------

    result = predict_dr(
        image_path
    )


    # ----------------------------------------------
    # Get Grad-CAM filename
    # ----------------------------------------------

    gradcam_filename = os.path.basename(
        result["gradcam_path"]
    )


    # ----------------------------------------------
    # Return result
    # ----------------------------------------------

    return {

        "prediction": result[
            "prediction"
        ],

        "confidence": result[
            "confidence"
        ],

        "uncertain": result[
            "uncertain"
        ],

        "predicted_class": result[
            "predicted_class"
        ],

        "gradcam": f"/results/{gradcam_filename}"

    }