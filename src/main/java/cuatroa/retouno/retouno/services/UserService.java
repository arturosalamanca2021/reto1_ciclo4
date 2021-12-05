/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cuatroa.retouno.retouno.services;

import cuatroa.retouno.retouno.model.User;
import cuatroa.retouno.retouno.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired 
    private UserRepository userRepository;
    
    /**
     * 
     * @return 
     */
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    /**
     * 
     * @param id
     * @return 
     */
    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }
    
    /**
     * 
     * @param user
     * @return 
     */
    public User registrar(User user){
        if(user.getId() == null) {
            if(!existEmail(user.getEmail())){
                return userRepository.save(user);
            }else{
                return user;
            }
        }else{
            return user;
        }
    }
    
    /**
     * 
     * @param email
     * @return 
     */
    public boolean existEmail(String email){
        return userRepository.existEmail(email);
    }
    
    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    public User authUser(String email, String password){
        Optional<User> user = userRepository.authUser(email, password);
        if(user.isEmpty()){
            return new User(email, password, "NO DEFINIDO");
        }else{
            return user.get();
        }
    }
    
    
}
