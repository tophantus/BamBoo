package com.shogun.Bamboo.auth.repositories;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.entities.UserStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserDetailsRepository extends JpaRepository<User, UUID> {
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findByEmail(String username);

    void deleteByEmail(String username);

    @EntityGraph(attributePaths = "authorities")
    List<User> findByIdNot(UUID id);

    @EntityGraph(attributePaths = "authorities")
    List<User> findByStatus(UserStatus status);

    @EntityGraph(attributePaths = "authorities")
    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findByIdWithAuthorities(@Param("id") UUID id);

}
