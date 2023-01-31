import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import DefaultLayout from '../components/DefaultLayout';
import { database } from '../firebase/setup';
import { ref, set, push } from "firebase/database";

interface FormRowProps {
    data: {
        label: string;
        type: string;
        placeholder: string;
        value: string;
        onValueChange: (value: string) => void;
        id: string;
        error: string;
        modified: boolean;
    }[];
}
const FormRow = ({ data }: FormRowProps) => {
    return (
        <div className="flex -mx-3 mb-3 w-full">
            <div className="flex grow">
                {data.map((item) => {
                    if (!item) return null;
                    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        item.onValueChange(e.target.value);
                    };
                    const inputField = (item.type === "textbox") ? (
                        <textarea onChange={handleChange} rows={3} className={`appearance-none block w-full bg-gray-200 text-gray-700 ${(item.error) ? "border border-red-500" : ""} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id={item.id} placeholder={item.placeholder} />
                    ) : (
                        <input onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 ${(item.error) ? "border border-red-500" : ""} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id={item.id} type={item.type} placeholder={item.placeholder} />
                    );
                    return (
                        <div className="px-3 mb-6 md:mb-0 w-full">
                            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2" htmlFor={item.id}>
                                {item.label}
                            </label>
                            {inputField}
                            {item.error && <p className="text-red-500 text-xs italic">{item.error}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const ContactPage: React.FC<PageProps> = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [errors, setErrors] = React.useState({} as { [key: string]: string; });

    const data = {
        fname: {
            label: "First Name",
            type: "text",
            placeholder: "Jane",
            value: firstName,
            onValueChange: setFirstName,
            id: "grid-first-name",
            error: errors.firstName,
        },
        lname: {
            label: "Last Name",
            type: "text",
            placeholder: "Doe",
            value: lastName,
            onValueChange: setLastName,
            id: "grid-last-name",
            error: errors.lastName,
        },
        email: {
            label: "Email",
            type: "email",
            placeholder: "janedoe@gmail.com",
            value: email,
            onValueChange: setEmail,
            id: "email",
            error: errors.email,
        },
        subject: {
            label: "Subject",
            type: "text",
            placeholder: "",
            value: subject,
            onValueChange: setSubject,
            id: "subject",
            error: errors.subject,
        },
        message: {
            label: "Message",
            type: "textbox",
            placeholder: "",
            value: message,
            onValueChange: setMessage,
            id: "message",
            error: errors.message,
        },

    };

    React.useEffect(() => {
        setErrors([]);
    }, [firstName, lastName, email, subject, message]);

    const validate = () => {
        const errors = {} as { [key: string]: string; };
        if (!firstName) errors.firstName = "First Name is required";
        if (!lastName) errors.lastName = "Last Name is required";
        if (!email) errors.email = "Email is required";
        if (!subject && !message) errors.message = "Subject or message is required";
        return errors;
    };

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const formData = {
                firstName, lastName, email, subject, message, timestamp: new Date().toISOString()
            };
            const newMessageRef = push(ref(database, 'contact'));
            set(newMessageRef, formData);
        }
    };
    return (
        <DefaultLayout>
            <div className="flex justify-center items-center w-full h-full">
                <form className="bg-white/5 p-6 rounded-lg" onSubmit={formSubmitHandler}>
                    <div className="flex flex-col flex-wrap mb-6">
                        <FormRow data={[data.fname, data.lname]} />
                        <FormRow data={[data.email]} />
                        <FormRow data={[data.subject]} />
                        <FormRow data={[data.message]} />
                        <input type="submit" value="Send Message" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );

};

export default ContactPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
