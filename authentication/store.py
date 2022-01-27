import hashlib, binascii, os

def hash_password(a):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    arr=[]
    c=0
    for i in a:
        pwdhash = hashlib.pbkdf2_hmac('sha256', i.encode('utf-8'), 
                                salt, 100000)
        arr.append(binascii.hexlify(pwdhash))
        c=c+1
    h=salt
    for i in arr:
        print(i)
        h+=i
    print(h)
    return h.decode('ascii')
 
def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[128:192]
    pwdhash = hashlib.pbkdf2_hmac('sha256', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

def check(password):
    salt = password[:64]
    print('salt: '+salt)
    print(password[64:192])
    arr=['a','b','c','d']
    c=0
    for i in range(101):
        i = str(i)
        # print(i)
        pwdhash = hashlib.pbkdf2_hmac('sha256', 
                                  i.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    
        if(password[64:128]==pwdhash):
            arr[0]=i
            c=c+1
        if(password[128:192]==pwdhash):
            arr[1]=i
            c=c+1
            print("For "+i+":"+pwdhash)
        elif(password[192:256]==pwdhash):
            arr[2]=i
            c=c+1
        elif(password[256:320]==pwdhash):
            arr[3]=i
            c=c+1
        if(c==4):
            break
        
    return arr

def ima():
    a=['asss','bvbv'] 
    return a          


    
