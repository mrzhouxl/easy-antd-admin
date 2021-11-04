import { message } from "ant-design-vue";
import { ref } from 'vue'

interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: response;
    url?: string;
    type?: string;
    size: number;
    originFileObj?: any;
}
interface response {
    url: string;
    encoding?: string;
    fieldname?: string;
    mimetype?: string;
    originalname?: string;
}
interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
}
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
//文件上传
export function useUpload(url?: string) {
    let fileList = ref<any>([]);
    let loading = ref<boolean>(false);
    let imageUrl = ref<string>('');
    let handle = []
    let action = url || 'http://localhost:7000/admin/api/uploadRecording';
    const beforeUpload = (file: FileItem) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const singleChange = (info: FileInfo) => {
        // if (info.file.status === 'uploading') {
        //     loading.value = true;
        //     return;
        // }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     // getBase64(info.file.originFileObj, (base64Url: string) => {
        //     //     imageUrl.value = base64Url;
        //     //     loading.value = false;
        //     // });
        //     imageUrl.value = info.file.response!.url
        // }
        // if (info.file.status === 'error') {
        //     loading.value = false;
        //     message.error('upload error');
        // }
    }

    const handleChange = ({ fileList: newFileList }: FileInfo) => {
        //存到内部的filelist中，本来打算自己维护的，但是基于vue的双向绑定 可以变 这个方法用处不打
        fileList.value = JSON.parse(JSON.stringify(newFileList));
    }

    const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }

    const singleHandleUrl = (imageModel: Object, name: string, v?: Array<Object>) => {
        setTimeout(() => {
            let img: any = v?.pop();
            console.log(img, v)
            imageModel[name] = img.response.url
        }, 500);
    }

    //用自定义返回的值，重新构造一个符合antd的一个对象
    const handleUrl = (imageModel: Array<any>, name, v?) => {
        imageModel[name] = v.map(v => {
            if ('url' in v) {
                return v.url
            } else {
                return v.response.url
            }
        })
        return imageModel[name]
    }

    const setUrl = (imageModel: Array<string>) => {
        return imageModel.map(v => {
            return {
                url: v,
                uid: GetRandomNum(10000, 99999),
                status: 'done',
                name: 'image' + new Date().valueOf(),
            }
        })

    }
    //用来存储维护内部的fileList
    // fileList.value =JSON.parse(JSON.stringify(imageModel[name])) 

    return {
        fileList,
        action,
        imageUrl,
        loading,
        beforeUpload,
        handleChange,
        singleChange,
        handleUrl,
        setUrl,
        singleHandleUrl,
    }
}