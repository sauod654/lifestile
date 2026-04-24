
import json

def compare_json(file1, file2):
    with open(file1, 'r', encoding='utf-8') as f1, open(file2, 'r', encoding='utf-8') as f2:
        data1 = json.load(f1)
        data2 = json.load(f2)
    
    missing_in_2 = {}
    for section, keys in data1.items():
        if section not in data2:
            missing_in_2[section] = "WHOLE SECTION MISSING"
            continue
        
        section_missing_keys = []
        for key in keys:
            if key not in data2[section]:
                section_missing_keys.append(key)
        
        if section_missing_keys:
            missing_in_2[section] = section_missing_keys
            
    return missing_in_2

missing = compare_json('c:\\Users\\AZUZ\\Desktop\\lifestile\\messages\\en.json', 'c:\\Users\\AZUZ\\Desktop\\lifestile\\messages\\ar.json')
print(json.dumps(missing, indent=2, ensure_ascii=False))
