import kagglehub
import os
import shutil

# Download the model
model_dir = kagglehub.model_download(
    "anettvarghese/blindness_efficentnetb0/pytorch/default"
)

print("Downloaded to:", model_dir)

# Source checkpoint
source = os.path.join(
    model_dir,
    "best_model_fold_3.pth"
)

# Destination inside our backend
destination = os.path.join(
    "model",
    "best_model_fold_3.pth"
)

shutil.copy2(source, destination)

print("Model copied to:", destination)
print("Exists:", os.path.exists(destination))