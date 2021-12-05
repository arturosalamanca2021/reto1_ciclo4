/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cuatroa.retouno.retouno.model;

import java.io.Serializable;
import javax.persistence.*;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name="user", indexes = @Index(name = "indx_email", columnList = "user_email", unique = true))
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NonNull
    @Column(name="user_email", nullable = false, length = 50)
    private String email;
    
    @NonNull
    @Column(name="user_password", nullable = false, length = 50)
    private String password;
    
    @NonNull
    @Column(name="user_name", nullable = false, length = 50)
    private String name;
}
