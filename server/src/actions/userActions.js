import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const userRegister = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const body = formData;

    const { data } = await axios.post("http://127.0.0.1:4000/user", body);

    if (data) {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      errormessage: error.message,
    });
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://127.0.0.1:4000/user/login`,
      { username: username, password: password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      error:
        error.data && error.data.detail
          ? error.data.detail
          : "Wrong Credentials",
    });
  }
};
