package ps.application.auth.traffic;

import ps.application.auth.dao.User;
import javax.validation.Valid;

public class UserRequest {

  @Valid
  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
