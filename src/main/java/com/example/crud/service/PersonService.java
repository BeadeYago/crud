package com.example.crud.service;

import com.example.crud.entity.Person;
import com.example.crud.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repo;

    public List<Person> findAll(){
        return repo.findAll();
    }

    public Person findById(Long id){
        return repo.findById(id).orElse(null);
    }

    public Person save(Person person){
        return repo.save(person);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}
