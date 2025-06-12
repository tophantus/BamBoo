package com.shogun.Bamboo.auth.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shogun.Bamboo.entities.BaseAuditEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Table(name = "AUTH_USER_DETAILS")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User extends BaseAuditEntity implements UserDetails  {

    @Id
    @GeneratedValue
    private UUID id;

    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String phoneNumber;

    private String verificationCode;

    private String provider;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.OFFLINE;

    private String profilePic;

    @ManyToMany(cascade =  {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "AUTH_USER_AUTHORITY",
            joinColumns = @JoinColumn(referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(referencedColumnName = "id")
    )
    private List<Authority> authorities;

    private boolean enabled=false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public List<Authority> getAuthorityList() {
        return this.authorities;
    }

}
