package com.bread.bakelab.domains.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter@Setter
@ToString
public class UserVO {
    @NotBlank
    @Length(max = 80)
    private String id;
    @NotBlank
    private String pw;
    @NotBlank
    private String name;
    @Email
    private String email;
    @NotBlank
    private String tel;

    private String address;
    @NotBlank
    @Pattern(regexp = "SELLER|USER")
    private String role;
    private String state;
}
