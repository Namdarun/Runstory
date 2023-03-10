package com.runstory.domain.running;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.runstory.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class RunningDibs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name= "running_id")
    private Running running;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name= "userId")
    private User user;

    public RunningDibs(Running running, User user){
        this.running = running;
        this.user = user;
    }
}
