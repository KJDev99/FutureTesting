from django.urls import path, re_path
from app.models import Subject

from app.views import home, test, all_questions
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('',home),
    path('test/<int:subject>', test),
    path('questions',all_questions)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns+= [re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT})]
    urlpatterns += [re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

def aa():
    from json import loads
    f = open('test.json', 'rb')

    data = loads(f.read())
    from .models import Question, Variant
    subject = Subject.objects.create(name="test")
    for question in data['data']:
        q = Question.objects.create(subject=subject, question=question['question'])
        for var in question['answers']:
            Variant.objects.create(question=q, answer=var['question'], is_true=var['isCorrect'])
            

        
# aa()