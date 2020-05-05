# waymo-2d-object-detection
2D - Object Detection using Waymo Open Dataset and Canadian Adverse Driving Conditions Dataset

### Setup

Install dependencies:

#### Waymo Open Dataset API:

`pip3 install waymo-open-dataset-tf-2-1-0==1.2.0`

#### Mask RCNN:

`git clone https://github.com/matterport/Mask_RCNN`

`tf_upgrade_v2 --intree Mask_RCNN/ \--outtree Mask_RCNN/`

`cd Mask_RCNN && python setup.py install`

#### RetinaNet:

`git clone https://github.com/fizyr/keras-retinanet`

`cd keras-retinanet && pip install .`

### Data Extraction
Waymo 2D Dection Dataset
Canadian Adverse Driving conditions dataset
For the Above datasets following data processing was done:
  - Extract tfredcord files for each frame.
  - Use openwaymo dataset apis to perform cleaning.
  - Collect Labels and generate bounding boxes.
  - Use front camera images and labels to compile the dataset
