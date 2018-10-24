package ps.application.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ps.application.auth.dao.User;
import ps.application.auth.mapper.UserMapper;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/allusers")
  public List<User> allusers() {
    return userMapper.findAll();
  }

  @GetMapping("/user")
  public Principal user(Principal user) {
    return user;
  }

  @PostMapping("/addusers")
  public String addusers(@RequestBody String users) {

    logger.info(users);
    return "ok";

  }

}
