# Computer Vision-Based Indoor Navigation

## Overview
This project aims to support indoor navigation using computer vision and object detection. It uses YOLO models to identify indoor objects from uploaded images through a web application.

## Features
- Upload indoor images for object detection.
- Select between three YOLO models.
- Display detected object labels and confidence scores.
- REST API built using FastAPI.
- Interactive frontend built using React.

## Models
1. **Kaggle Indoor Model:** Detects 10 indoor object classes, including doors, windows, chairs, and tables.
2. **Original Indoor Model:** Detects 26 indoor object classes.
3. **YOLOv8 General Model:** Pretrained model with 80 general object classes.

## Technology Stack
- Python
- Ultralytics YOLOv8
- FastAPI
- React
- Vite

## Project Structure
```text
indoor-navigation/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── best.pt
│   ├── best_old.pt
│   └── yolov8n.pt
├── web/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Run Locally

### Backend
Install the dependencies:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend
Open a second terminal:

```bash
cd web
npm install
npm run dev
```

Open the local frontend URL displayed by Vite, usually `http://localhost:5173`.

## Dataset
The training datasets are not included in this repository because of their size. The trained model weights are included.

## Current Limitations
Object detection performance varies by class and image conditions. The models may miss doors or incorrectly classify objects. This project is a prototype and is not yet a reliable standalone navigation system.