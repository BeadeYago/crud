let url = "http://localhost:8080/api/persons";
let tableData = document.querySelector(".tableData");
let createForm = document.getElementById('createForm');
let editForm = document.getElementById('editForm');
let id = 1;
let persons = [];

let loadPersons = async () => {
    try {
        const res = await fetch(`${url}`);
        persons = await res.json();
        displayPersons(persons);
    } catch (err) {
        console.error(err);
    }
}

let displayPersons = (persons) => {
    let htmlString = persons.map((person) => {
        return `
        <tr data-id="${person.id}">
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.lastName}</td>
            <td>${person.phone}</td>
            <td>${person.email}</td>
            <td>
                <button data-id="${person.id}" type="button" name="editar" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser" onclick="getIdforForm()">Editar</button>
            </td>
            <td>
                <button data-id="${person.id}" type="button" name="eliminar" class="btn btn-danger" onclick="getIdforDelete()">Eliminar</button>
            </td>
        </tr>
        `;
    }).join('');
    tableData.innerHTML = htmlString;
};

loadPersons();

let getIdforForm = () => {
    tableData.addEventListener('click', (e) => {
        id = e.target.dataset.id;
        poblateForm();
    })
}

let getIdforDelete = () => {
    tableData.addEventListener('click', (e) => {
        id = e.target.dataset.id;
        deletePerson();
    })
}

let poblateForm = () => {
    if(id == undefined){
    } else {
        fetch(`${url}/${id}`)
        .then(res => res.json())
        .then((person) => {
            document.getElementById('editName').value = person.name;
            document.getElementById('editLastName').value = person.lastName;
            document.getElementById('editPhone').value = person.phone;
            document.getElementById('editEmail').value = person.email;
        })
    }
}

let deletePerson = () => {
    Swal.fire({
        title: '¿Estas Seguro?',
        text: "¡No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, eliminalo!',
        cancelButtonText: '¡No lo elimines!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(id == undefined){
            } else {
                fetch(`${url}/${id}`, {
                    method: 'DELETE'
                }).catch(err => console.log(err))
                    .then(res => res.json)
                    .then(() => loadPersons());
                Swal.fire(
                    '¡Eliminado!',
                    'La persona ha sido eliminada con exito.',
                    'success'
                )
            }
        }
    })
}


let addPerson = () => {
    let createName = document.getElementById('createName').value;
    let createLastName = document.getElementById('createLastName').value;
    let createPhone = document.getElementById('createPhone').value;
    let createEmail = document.getElementById('createEmail').value;
    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: createName,
            lastName: createLastName,
            phone: createPhone,
            email: createEmail
        })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('createName').value = "";
            document.getElementById('createLastName').value = "";
            document.getElementById('createPhone').value = "";
            document.getElementById('createEmail').value = "";
            loadPersons();
        });
};

createForm.addEventListener('submit', function (e) {
    e.preventDefault();

    Swal.fire(
        'El usuario ha sido creado.',
        '',
        'success'
    )

    addPerson();
});

let editPerson = () => {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editName = document.getElementById('editName').value,
            lastName: editLastName = document.getElementById('editLastName').value,
            phone: editPhone = document.getElementById('editPhone').value,
            email: editEmail = document.getElementById('editEmail').value
        })
    })
        .then(response => response.json)
        .then(loadPersons())
}


editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Usuario editado',
        html: 'El usuario ha sido editado!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
    })
    editPerson();
});
