from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("register/", views.register, name="register"),
    path("login/", views.login1, name="login1"),
    path("login2/", views.login2, name="login2"),
    path("images/", views.images, name="images"),
    
    
]