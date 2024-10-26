import { BASE_URL, TOKEN } from '@env';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
const Token = TOKEN;

export const submitForm = async (formData, subcategory) => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
        if (key === 'images') {
            formData.images.forEach((imageUri, index) => {
                formDataToSend.append('images[]', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: `image_${index}.jpg`,
                });
            });
        } else {
            formDataToSend.append(key, formData[key]);
        }
    });

    formDataToSend.append('category_id', subcategory.id);
    formDataToSend.append('guard_name', subcategory.guard_name);
    formDataToSend.append('post_type', 'sell');
    formDataToSend.append('address', 'India');

    var apiUrl = `${BASE_URL}/posts`;
    if (formData.id) {
        apiUrl = `${BASE_URL}/posts/${formData.id}`;
    }
    console.log(apiUrl);
    console.log(formDataToSend);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formDataToSend,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Token}`
            },
        });

        const responseData = await response.json();
        if (response.ok) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Details submitted successfully!',
                button: 'close',
            });
        } else {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Validation Error',
                textBody: responseData.message,
                button: 'close',
            });
        }

        return responseData;
    } catch (error) {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Error',
            textBody: 'There was an issue submitting the form.',
            button: 'close',
        });
        throw error;
    }
}