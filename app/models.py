from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.





class Subject(models.Model):
    name:str = models.CharField(max_length=100)
    image = models.ImageField(upload_to='subjects/', blank=True)
    description:str = models.TextField()


    
    def tests(self) -> "list[Question]":
        return Question.objects.filter(subject=self)





class Question(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    question = RichTextField()

    def variants(self) -> "list[Variant]":
        return Variant.objects.filter(question=self)

        
    

class Variant(models.Model):
    question: Question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer: str = models.TextField()
    is_true: str = models.BooleanField()