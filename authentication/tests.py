from django.test import TestCase
from hash_file import hash_password, check
import time
import hashlib
# Create your tests here.
# a = ['11','12','56','1']
# password = hash_password(a)
# images = check(password)
# print(images)
start_time = time.time()
filename = "authentication\Banana.jpg"
with open(filename,"rb") as f:
    bytes = f.read() # read entire file as bytes
    readable_hash = hashlib.sha256(bytes).hexdigest();
    print("--- %s seconds ---" % (time.time() - start_time))
    print(readable_hash)

start_time1= time.time()
a= '12'
readable_hash = hashlib.sha256(a.encode('utf-8')).hexdigest();
print("--- %s seconds1 ---" % (time.time() - start_time))
print(readable_hash)