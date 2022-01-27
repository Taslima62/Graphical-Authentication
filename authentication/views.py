from django.shortcuts import render
from .models import LoginTry, User, Images, LoginError, SuccessRate
from .hash_file import hash_password, direction, check, verify_password
from json import dumps
from django.utils.crypto import get_random_string
import random
import json
from django.contrib import messages
from django.utils import timezone
# Create your views here.

def index(request):   
    return render(request, 'authentication/home.html')


def register(request):
    if request.method == "POST":
        username = request.POST.get('username', '')   
        password = request.POST.get('5', '')
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        if User.objects.filter(username = username).exists():
            messages.error(request, 'Username exists. Try another one')
        else:
            u = User(username = username, password=password, name = name, email=email)
            u.save()
            return render(request, 'authentication/basic.html',{'n':2})
    img= Images.objects.all()
    image1 = []
    image2 = []
    image3 = []
    image4 = []
    # print(img)
    for i in img:
        if i.status=="1":
            image1.append(i.name)
        elif i.status=="2":
            image2.append(i.name)
        elif i.status=="3":
            image3.append(i.name)
        elif i.status=="4":
            image4.append(i.name)

    img= Images.objects.filter(status = "ok")
    d_image = []
    for i in img:
        d_image.append(i.name)
    context = {'r': [1, 2, 3, 4], 'images1': image1,'images2': image2,'images3': image3,'images4': image4, 'd_image': d_image}
    return render(request, 'authentication/register.html', context)

def login1(request):  
    if request.method == "POST":
        if 'submitBtn' in request.POST:
            username = request.POST.get('username', '') 
            p = User.objects.filter(username=username)
            if p.exists():
                w = LoginTry.objects.filter(username = username)
                c = 0
                for m in w:
                    if m.whenpublished() == "true":
                        c +=1
                
                if(c == 4):
                    # now = datetime.now()
                    # current_time = now.strftime("%H:%M:%S")
                    blk = LoginError(username=username)
                    blk.save()

                if(c > 4):
                    time = LoginError.objects.get(username = username).time
                    now = timezone.now()
                    
                    diff= now - time
                    temp = ''
                    if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 60:
                        temp= 60-diff.seconds
                    else:
                        x = LoginError.objects.filter(username = username)
                        x.delete()
                        x1 = LoginTry.objects.filter(username = username)
                        x1.delete()
                    return render(request, 'authentication/login1.html', {'temp': temp})
                else:
                    for j in p:
                        password = j.password
                # images = check(password)
                    img= Images.objects.all()
                    image1 = []
                    image2 = []
                    image3 = []
                    image4 = []
                    # print(img)
                    for i in img:
                        if i.status=="1":
                            image1.append(i.name)
                        elif i.status=="2":
                            image2.append(i.name)
                        elif i.status=="3":
                            image3.append(i.name)
                        elif i.status=="4":
                            image4.append(i.name)

                    img= Images.objects.filter(status = "ok")
                    user_id = User.objects.get(username=username).id
                    d_image = []
                    for i in img:
                        d_image.append(i.name)
                    context = {'r': [1, 2, 3, 4], 'password': password,'username': username, 
                    'images1': image1,'images2': image2,'images3': image3,'images4': image4, 'd_image': d_image, 'user_id': user_id}
                    return render(request, 'authentication/login2.html',context)
            else:
                
                return render(request, 'authentication/login1.html', {'msg': "Invalid username"})
        else:
            username = request.POST.get('username', '')
            validity = request.POST.get('validity', '')
            if(validity == "true"):
                d = SuccessRate(username = username )
                d.save()
                w1 = LoginTry.objects.filter(username = username)
                w1.delete()
                w2 = LoginError.objects.filter(username = username)
                w2.delete()
                return render(request, 'authentication/basic.html',{'n':1})
            else:
                d = SuccessRate(username = username, status = False)
                d.save()
                a = LoginTry(username = username, status = False)
                a.save()
                
                w = LoginTry.objects.filter(username = username)
                c = 0
                for m in w:
                    if m.whenpublished() == "true":
                        c +=1
                print(c)
                if(c == 4):
                    # now = datetime.now()
                    # current_time = now.strftime("%H:%M:%S")
                    blk = LoginError(username=username)
                    blk.save()

                if(c > 4):
                    time = LoginError.objects.get(username = username).time
                    now = timezone.now()
                    
                    diff= now - time
                    temp = ''
                    if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 60:
                        temp= 60-diff.seconds
                    return render(request, 'authentication/login1.html',  {'temp': temp}) 
                else:
                    p = User.objects.filter(username=username)
                    if p.exists():
                        for j in p:
                            password = j.password
                # images = check(password)
                        img= Images.objects.all()
                        image1 = []
                        image2 = []
                        image3 = []
                        image4 = []
                        # print(img)
                        for i in img:
                            if i.status=="1":
                                image1.append(i.name)
                            elif i.status=="2":
                                image2.append(i.name)
                            elif i.status=="3":
                                image3.append(i.name)
                            elif i.status=="4":
                                image4.append(i.name)

                        img= Images.objects.filter(status = "ok")
                        user_id = User.objects.get(username=username).id
                        d_image = []
                        for i in img:
                            d_image.append(i.name)
                        context = {'r': [1, 2, 3, 4], 'password': password,'username': username, 
                        'images1': image1,'images2': image2,'images3': image3,'images4': image4, 'd_image': d_image, 'user_id': user_id}
                        return render(request, 'authentication/login2.html',context)

    return render(request, 'authentication/login1.html')

def login2(request):
    images = ['1','2','3','4']
    return render(request, 'authentication/login2.html',{'mydata': images, 'r': [1,2,3,4] })

def images(request):
    # for i in range(21):
    #     r =  random.randint(4, 19)
    #     code = get_random_string(length=r)
    #     while Images.objects.filter(name=code).exists():
    #         r =  random.randint(4, 19)
    #         code = get_random_string(length=r) 
    #     a= Images(name = code)
    #     a.save() 

    a = Images.objects.filter()
    b = []
    for i in a:
        if i.id>108:
            b.append(i.name)
    print(b)


    return render(request, 'authentication/basic.html')