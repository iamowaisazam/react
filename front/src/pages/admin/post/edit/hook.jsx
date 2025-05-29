import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSinglePost, editPost } from '../postFeature';
import apiClient from '../../../../utils/apiClient';
import { useSelector } from 'react-redux';



export default function useEditPost(id){

      const navigate = useNavigate();
      const auth = useSelector(state => state.auth);

    
   const [state, setState] = useState({ loading: false, errors: {} });
   const [formData, setFormData] = useState({
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
        setFormData((prev) => ({
        ...prev,
        [field]: value,
        }));
   };


   const handleVersionChange = (version) => {
        if (version) {
            setFormData((prev) => ({
                ...prev,
                verId: version._id,
                modelId: version.modelId?._id || '',
                makeId: version.makeId?._id || '',
                catId: version.catId?._id || '',
            }));
        } else {
            setFormData((prev) => ({
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
                
                
                setFormData({
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

        formData.userId = auth.user.id;
        setState({ loading: true, errors: {} });
          apiClient.put(`admin/posts/${id}`,formData)
          .then(({data}) =>{
        
             setState((prev) => ({
                ...prev,
                loading: false,
                errors: {}
            }));    
            toast.success("Record Created Successfull");
            
          }).catch(({response}) => {

            if(response.data?.errors){
                 setState({
                    loading: false,
                    errors: response.data?.errors || {},
                });
                 toast.error("Validation failed. Please check the fields.");
            }else{

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    errors: {}
                }));
                 toast.error(response.data?.message ?? "Something Went Wrong");
            }
        }); 

    };



    return {
        state,
        fetchVersion,
        handleInputChange,
        handleVersionChange,
        formData,
        setFormData,
        handleSubmit
    };

}


