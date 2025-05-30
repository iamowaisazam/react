import { useEffect, useState } from "react";
import api from "../utils/apiClient";


export default function useDatatable({url}){


    const [datatable, setDatable] = useState({
        data:[],
        search: '',
        page: 1,
        pages: 0,
        loading: true,
        total: 0,
        skip: 0,
        limit: 10,
        error:'',
        loading:false,
    });


    const changeDatatable = (field, value) => {
        setDatable((prev) => ({
        ...prev,
        [field]: value,
        }));
    };

    const getRecords = async () => {

            setDatable((prev) => ({
              ...prev,
              loading:true
            }));

           api.get(url, { params: {
                search: datatable.search,
                page: datatable.page,
                limit: datatable.limit,
           }})
           .then(({data}) => {

                data = data.data;
                setDatable((prev) => ({
                    ...prev,
                    loading:false,
                    data:data.data,
                    pages: data.pages,
                    total: data.total,
                    skip: data.skip
                }));

            })
            .catch((error) => {
                setDatable((prev) => ({
                    ...prev,
                    loading:false,
                    data:[]
                }));
            });
    };

    useEffect(() => {

        getRecords();

    }, [datatable.search,datatable.page,datatable.limit]);



   return {
       datatable,
       changeDatatable,
       getRecords,
   }

}