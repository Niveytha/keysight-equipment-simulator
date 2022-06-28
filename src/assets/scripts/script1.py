import sys
import json

# reads all the data which is sent to the Python shell
data = sys.stdin.readlines()
data = json.loads(data[0])  # 10
print(data[0]+10)

# print('#Hello from python#')
# print('First param: ' + sys.argv[1] + '#')
# print('Second param: ' + sys.argv[2] + '#')

sys.stdout.flush()
