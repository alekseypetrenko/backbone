// Backbone model (сущность, содержащая данные, а так же логику для работы с ними)
let Todo = Backbone.Model.extend({
    defaults: {
        author: "",
        todo: ""
    }
})

// Backbone Collection (группа моделей)
let Todos = Backbone.Collection.extend({});

// Инициализируем Коллекцию
let todos = new Todos();

// Backbone View (отбражение состояния, реакция на события в DOM)
// View для одного элемента Todo
let TodoView = Backbone.View.extend({
    model: new Todo(),
    tagName: "tr",
    initialize: function() {
        this.template = _.template($(".todo-list-template").html());
    },
    events: {
        "click .todo-delete": "delete"
    },
    delete: function(){
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

})

// View для всех Todo
let TodosView = Backbone.View.extend({
    model: todos,
    el: $(".todo-list"),
    initialize: function() {
        this.model.on('add', this.render, this);
        this.model.on('remove', this.render, this);
    },
    render: function() {
        this.$el.html('');
        _.each(this.model.toArray(), function(todo) {
            this.$el.append((new TodoView({model: todo})).render().$el);
        }, this);
        return this;
    }
})

let todosView = new TodosView();

$(document).ready(function(){
    $(".add-todo").on("click", function(){
        let todo = new Todo({
            author: $(".author-input").val(),
            todo: $(".todo-input").val()
        });
        $(".author-input").val("");
        $(".todo-input").val("");
        console.log(todo);
        todos.add(todo);
    })
})