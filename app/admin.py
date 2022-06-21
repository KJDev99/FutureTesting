from django.contrib import admin

# Register your models here.
from .models import  Question, Subject, Variant




class VariantInline(admin.TabularInline):
    model = Variant
    extra = 0


class QuestionInline(admin.TabularInline):
    
    model = Question
    extra = 0


class SubjectAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]





@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [VariantInline]





@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline
    ]