import os
import json

# 图片文件夹的路径
image_folder = 'images/'

# 获取图片文件夹中的所有文件
image_files = [os.path.join(image_folder, file) for file in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, file))]

# JavaScript 文件的路径
js_file_path = 'script.js'

# 读取现有的 JavaScript 文件
with open(js_file_path, 'r', encoding='utf-8') as file:
    js_content = file.read()

# 查找并替换 images 数组
start_marker = 'const images = ['
end_marker = '];'
start_index = js_content.find(start_marker) + len(start_marker)
end_index = js_content.find(end_marker, start_index)
json_images = json.dumps(image_files)[1:-1] 
new_js_content = js_content[:start_index] + json_images + js_content[end_index:]

# 将修改后的内容写回 JavaScript 文件
with open(js_file_path, 'w') as file:
    file.write(new_js_content)

print("JavaScript file updated with image paths.")