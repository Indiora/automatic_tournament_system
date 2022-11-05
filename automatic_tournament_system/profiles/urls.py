from django.urls import path, include
from django.views.generic import TemplateView

from .views import Register, UserLogin, UserLogout, UserPasswordReset, EmailVerify, PasswordResetConfirmView, \
    PasswordChangeView, PasswordChangeDoneView, Profile
import django.contrib.auth.urls

urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('password_reset/', UserPasswordReset.as_view(), name='password_reset'),
    path('confirm_email/', TemplateView.as_view(template_name='registration/confirm_email.html'), name='confirm_email'),
    path('confirm_email/<uidb64>/<token>/', EmailVerify.as_view(), name="verify_email"),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('invalid_verify/', TemplateView.as_view(template_name='registration/invalid_verify.html'),
         name='invalid_verify'),
    path('', include('django.contrib.auth.urls')),
    path("password_change/", PasswordChangeView.as_view(), name="password_change"),
    path("password_change/done/", PasswordChangeDoneView.as_view(),name="password_change_done" ),
    path('profile/<str:slug>/', Profile.as_view(), name='profile'),

]