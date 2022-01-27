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
        h+=i
    return h.decode('ascii')
 
def direction(stored_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[320:384]
    for i in range(1,9):
        i = str(i)
        pwdhash = hashlib.pbkdf2_hmac('sha256', 
                                  i.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        if(pwdhash == stored_password):
            return i

def check(password):
    print(password)
    salt = password[:64]
    print("salt:"+salt)
    arr=['1st','2nd','3rd','4th']
    c=0
    for i in range(101):
        i = str(i)
        # print(i)
        pwdhash = hashlib.pbkdf2_hmac('sha256', 
                                  i.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        # print(pwdhash)
        if(password[64:128]==pwdhash):
            arr[0]=i
            c=c+1
        if(password[128:192]==pwdhash):
            arr[1]=i
            c=c+1
        elif(password[192:256]==pwdhash):
            arr[2]=i
            c=c+1
        elif(password[256:320]==pwdhash):
            arr[3]=i
            c=c+1
        if(c==4):
            break
        
    return arr

def verify_password(pass_place, select_place,direct):
    if(direct == "1"):
        pass
              


    
