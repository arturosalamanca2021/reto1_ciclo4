/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cuatroa.retouno.retouno.repository;

import cuatroa.retouno.retouno.model.User;
import cuatroa.retouno.retouno.repository.crud.UserCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;
    
    /***
     * 
     * @return 
     */
    public List<User> getAll() {
        return (List<User>) userCrudRepository.findAll();
    }
    
    /**
     * 
     * @param id
     * @return 
     */
    public Optional<User> getUser(int id) {
        return userCrudRepository.findById(id);
    }
    
    /**
     * 
     * @param user
     * @return 
     */
    public User save(User user){
        return userCrudRepository.save(user);
    }
    
    /**
     * 
     * @param email
     * @return 
     */
    public boolean existEmail(String email){
        Optional<User> usuario = userCrudRepository.findByEmail(email);
        return !usuario.isEmpty();
    }
    
    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    public Optional<User> authUser(String email, String password){
        return userCrudRepository.findByEmailAndPassword(email, password);
    }
    
}
