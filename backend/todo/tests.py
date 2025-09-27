from django.test import TestCase

# Create your tests here.
from .models import Todo
import json

class TodoCRUDTest(TestCase):

    def setUp(self):
        self.todo=Todo.objects.create(title='Todo 1',description='todo 1 description',
        deadline='2025-09-27',completed=False)

        self.valid_data={'title':'Todo 2','description':'todo 2 description','deadline':'2025-09-27','completed':False}

        self.invalid_data={'title':'Todo 2'}
    
    #create
    def test_create_todo_success(self):

        res = self.client.post(
            '/api/create/',
            data=json.dumps(self.valid_data),
            content_type='application/json'
        )
        self.assertEqual(res.status_code,201)
        self.assertEqual(Todo.objects.count(),2)
    

    def test_create_todo_missing(self):
        res = self.client.post(
            '/api/create/',
            data=json.dumps(self.invalid_data),
            content_type='application/json'
        )
        self.assertEqual(res.status_code,400)
    

    #read
    def test_get_all_todos(self):

        res=self.client.get(
            '/api/get/',
        )
        self.assertEqual(res.status_code,200)
        data=json.loads(res.content)
        self.assertEqual(len(data),1)
    

    #update
    def test_update_todo_success(self):
        res = self.client.put(
            f'/api/update/{self.todo.id}/',
            data=json.dumps({'title':'Todo 1 updated','description':'todo 1 description updated','deadline':'2025-09-28','completed':True}),
            content_type='application/json'
        )
        self.assertEqual(res.status_code,204)
        updated_todo=Todo.objects.get(id=self.todo.id)
        self.assertEqual(updated_todo.title,'Todo 1 updated')
    

    def test_update_todo_invalid_data(self):
        res = self.client.put(
            f'/api/update/{self.todo.id}/',
            data=json.dumps({'title':''}),
            content_type='application/json'
        )
        self.assertEqual(res.status_code,400)
    
    
    #delete

    def test_delete_todo(self):
        res=self.client.delete(
            f'/api/delete/{self.todo.id}/'
        )
        self.assertEqual(res.status_code,204)
        self.assertFalse(Todo.objects.filter(id=self.todo.id).exists())
    

    def test_delete_todo_not_exists(self):
        res=self.client.delete(
            f'/api/delete/200/'
        )
        self.assertEqual(res.status_code,404)