import os

def get_filepath_from_local(path):
    li_extent = ["jpg", "png", "jpeg"]
    try:
        li_img = [filename for filename in os.listdir(path) if filename.lower().split('.')[-1] in li_extent]
    except Exception as e:
        print(e)
        return False, None

    return True, li_img
