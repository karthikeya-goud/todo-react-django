
from .models import Todo
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.forms.models import model_to_dict


@csrf_exempt
def create_todo(request):
    if request.method!="POST":
        return JsonResponse({"err":"wrong method"},status=405)
    try:
        data=json.loads(request.body)

        title=data.get("title")
        desc=data.get('description')
        date=data.get('deadline')
        date=datetime.strptime(date,'%Y-%m-%d').date()
        completed=data.get('completed')

        Todo.objects.create(
            title=title,
            description=desc,
            completed=completed,
            deadline=date
        )

        return JsonResponse({"msg":"created"},status=201)
    except Exception as e:
        return JsonResponse({"err":str(e)},status=400)


def get_todos(request):
    if request.method!='GET':
        return JsonResponse({'err':"wrong method"},status=405)
    
    todos=Todo.objects.all()
    res=[model_to_dict(todo) for todo in todos]

    return JsonResponse(res,safe=False)

@csrf_exempt
def update_todo(request,id):

    if request.method not in ['PUT','PATCH']:
        return JsonResponse({'err':"wrong method"},status=405)
    
    try:
        todo=Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return JsonResponse({'err':"Todo record not found"},status=404)
    
    try:
        data=json.loads(request.body)
        if len(data['title'])==0:return JsonResponse({'err':"title is missing"},status=400)

        title=data.get("title")
        desc=data.get('description')
        date=data.get('deadline')
        if date:
            date=datetime.strptime(date,'%Y-%m-%d').date()
        completed=data.get('completed')

        todo.title=data.get('title',todo.title)
        todo.description=data.get('desc',todo.description)
        todo.deadline=date if date is not None else todo.deadline
        todo.completed=data.get('completed',todo.completed)
        todo.save()

        return JsonResponse({'msg':"todo updated successfully"},status=204)

    except Exception as e:
        return JsonResponse({'err':str(e)},status=400)

@csrf_exempt
def delete_todo(request,id):

    if request.method!="DELETE":
         return JsonResponse({'err':"Todo record not found"},status=405)
    
    try:
        todo=Todo.objects.get(id=id)
        todo.delete()
        return JsonResponse({"msg": "Todo deleted successfully"},status=204)
    except Todo.DoesNotExist:
        return JsonResponse({'err':'Todo does not exsist'},status=404)