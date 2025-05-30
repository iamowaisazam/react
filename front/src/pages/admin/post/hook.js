import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../../utils/apiClient';
import { useSelector } from 'react-redux';

export default function useEditPost(id = null){

   const navigate = useNavigate();
   const auth = useSelector(state => state.auth); 
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});
   const [form, setForm] = useState({

        title:'',
        slug:'',
        price:'',
        description: '',

        // Maping
        catId:'',
        makeId:'',
        modelId:'',
        verId:'',
        
        // Features
        features:[],
        tags:[],

        // Location
        country: '',
        city: '',
        state: '',
        
        // Map
        latitude: '',
        longitude: '',
        
        status: '',
   });


   const handleInputChange = (field, value) => {
        setForm((prev) => ({
        ...prev,
        [field]: value,
        }));
   };


   const handleVersionChange = (version) => {
        if (version) {
            setForm((prev) => ({
                ...prev,
                verId: version._id,
                modelId: version.modelId?._id || '',
                makeId: version.makeId?._id || '',
                catId: version.catId?._id || '',
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                verId: '',
                modelId: '',
                makeId: '',
                catId: '',
            }));
        }
    };


    const fetchVersion = async () => {

        apiClient.get(`admin/posts/${id}`)
        .then(({data}) =>{

             const record = data.data;

                setForm({
                    title: record.title ?? '',
                    slug: record?.slug ?? '',
                    price:record?.price ?? '',
                    description:record?.description ?? '',

                    catId: record?.catId ?? '',
                    makeId: record?.makeId ?? '',
                    modelId: record?.modelId ?? '',
                    verId: record?.verId ?? '',
                    
                    features:record?.features ?? [],
                    tags:record?.tags ?? [],                   
                    
                    country: record?.country ?? '',
                    city: record?.city ?? '',
                    state: record?.state ?? '',
                    latitude: record?.latitude ?? '',
                    longitude: record?.longitude ?? '',
                    
                    status: record?.status ?? '',
                });

        }).catch(({response}) => {                        
             toast.error("Failed to fetch post details");
             navigate('/admin/view-post');
        }); 

    };


    
    const handleSubmit = async (e) => {

          e.preventDefault();

          form.userId = auth.user.id;
          setErrors({});
          setLoading(false);

          apiClient.put(`admin/posts/${id}`,form)
          .then(({data}) =>{
            
            setErrors({});
            setLoading(false);
            toast.success("Record Created Successfull");
            
          }).catch(({response}) => {

            if(response.data?.errors){
                 setErrors(response.data?.errors || {});
                 setLoading(false);
                 toast.error("Validation failed. Please check the fields.");
            }else{

                setErrors({});
                setLoading(false);
                toast.error(response.data?.message ?? "Something Went Wrong");
            }
        }); 

    };


    const handleDelete = async (id) => {
                return apiClient.delete(`admin/posts/${id}`);
    };


    return {
        errors,
        loading,
        fetchVersion,
        handleInputChange,
        handleVersionChange,
        form,
        setForm,
        handleSubmit,
        handleDelete
    };

 }
 
    export const getPost = (data) => {
     return apiClient.get(`admin/posts`, { params: data });
    };

    export const createPost = (data) => {
        return apiClient.post("admin/posts/create", data);
    };

    export const editPost = (id, data) => {

        return apiClient.put(`admin/posts/${id}`, data);
    };

    export const deletePost = (id) => {
        return apiClient.delete(`admin/posts/${id}`);
    };

