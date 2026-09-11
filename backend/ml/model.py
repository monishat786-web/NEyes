from dataclasses import dataclass
from typing import Optional


@dataclass
class Patient:
    patient_id: Optional[int] = None
    name: str = ""
    age: Optional[int] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    language: Optional[str] = None


@dataclass
class Screening:
    screening_id: Optional[int] = None
    patient_id: Optional[int] = None
    image_path: Optional[str] = None
    image_quality: Optional[str] = None
    blur_score: Optional[float] = None
    brightness_score: Optional[float] = None
    contrast_score: Optional[float] = None
    retinal_visibility: Optional[str] = None
    dr_result: Optional[str] = None
    confidence: Optional[float] = None
    ai_not_sure: bool = False
    gradcam_path: Optional[str] = None
    high_risk: bool = False


@dataclass
class Reminder:
    reminder_id: Optional[int] = None
    patient_id: Optional[int] = None
    reminder_date: Optional[str] = None
    reminder_type: Optional[str] = None
    status: str = "Pending"


@dataclass
class OfflineSync:
    sync_id: Optional[int] = None
    screening_id: Optional[int] = None
    patient_id: Optional[int] = None
    sync_status: str = "Pending"
    saved_at: Optional[str] = None
    synced_at: Optional[str] = None