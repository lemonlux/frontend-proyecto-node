import './AccountSettings.css'

import { updateUser } from '../services/user.service'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorUpdate } from '../hooks/index';
import { UploadFile } from '../components/UploadFile';

import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useDeleteUser } from '../hooks/useDeleteUser';



export const AccountSettings = () => {

}
