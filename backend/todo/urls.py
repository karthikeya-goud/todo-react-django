from django.urls import path
from . import views
urlpatterns=[
    path('create/',views.create_todo),
    path('get/',views.get_todos),
    path('update/<int:id>/',views.update_todo),
    path('delete/<int:id>/',views.delete_todo),
]