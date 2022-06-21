from django.http import FileResponse, JsonResponse
from django.shortcuts import render
from .models import Question, Subject
# Create your views here.
def home(request):
    print(request.method)
    if request.method == 'GET':
        subjects: list[Subject] = Subject.objects.all()
        return render(request,'index.html',{
            "subjects": subjects,
        })
    





def test(request, subject):
    if request.method == 'GET':
        subject: Subject = Subject.objects.get(pk=subject)
        return render(request,'test.html', {
            "subject": subject,
            "questions": subject.tests()
        })
    elif request.method == 'POST':
        subject: Subject = Subject.objects.get(pk=subject)
        return JsonResponse(
            {
                "questions": [
                    {
                        "question": question.question,
                        "variants": [
                            {
                                "text": variant.answer,
                                "is_true": variant.is_true
                            } for variant in question.variants()
                        ]
                    } for question in subject.tests()
                ]
            }
        )


def all_questions(request):
    all_questions: "list[Question]" = Question.objects.all()
    
    return JsonResponse({
        "question": [
            {
                "question": question.question,
                "variants": [
                    {
                        "text": variant.answer,
                        "is_true": variant.is_true
                    } for variant in question.variants()
                ]
            } for question in all_questions
        ] 
    })