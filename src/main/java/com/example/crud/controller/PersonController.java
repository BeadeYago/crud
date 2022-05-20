package com.example.crud.controller;

import com.example.crud.entity.Person;
import com.example.crud.exception.BusinessException;
import com.example.crud.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService service;

    @GetMapping("/persons")
    public ResponseEntity<?> findByAll(){
        List<Person> list = service.findAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/persons/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));
    }

    @PostMapping("/persons")
    public ResponseEntity<?> save(@Valid @RequestBody Person person){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(person));
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Person person,@PathVariable Long id){
        final Person personToUpdate = service.findById(id);

        if(personToUpdate == null){
            throw new BusinessException("P-500",HttpStatus.INTERNAL_SERVER_ERROR,
                    "Client with id: " + id + " doesn't exist.");
        } else{
            personToUpdate.setName(person.getName());
            personToUpdate.setLastName(person.getLastName());
            personToUpdate.setEmail(person.getEmail());
            personToUpdate.setPhone(person.getPhone());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(personToUpdate));
        }
    }


    @DeleteMapping("/persons/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        if (service.findById(id) != null){
            service.delete(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else{
            throw new BusinessException("P-500", HttpStatus.NOT_FOUND,
                    "Person with id: " + id + " doesn't exist.");
        }
    }
}
