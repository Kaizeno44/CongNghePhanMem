from django import forms
from .models import CustomUser  # Đảm bảo CustomUser đã được định nghĩa trong models.py
from webbansua.models import CustomUser  # Import mô hình người dùng mặc định


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Tên đăng nhập'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Mật khẩu'}))

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if not username:
            raise forms.ValidationError("Tên đăng nhập không được để trống.")
        return username

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if not password:
            raise forms.ValidationError("Mật khẩu không được để trống.")
        return password



class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Mật khẩu")

    class Meta:
        model = CustomUser
        fields = ['username', 'phone_number', 'password']  # Đúng tên trường trong mô hình

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            raise forms.ValidationError("Tên người dùng đã tồn tại.")
        return username

    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number')
        if not phone_number.isdigit() or len(phone_number) != 10:
            raise forms.ValidationError("Số điện thoại không hợp lệ.")
        if CustomUser.objects.filter(phone_number=phone_number).exists():
            raise forms.ValidationError("Số điện thoại đã được sử dụng.")
        return phone_number

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 6:
            raise forms.ValidationError("Mật khẩu phải có ít nhất 6 ký tự.")
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])  # Mã hóa mật khẩu
        if commit:
            user.save()
        return user