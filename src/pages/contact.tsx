import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import DefaultLayout from '../components/DefaultLayout';
import { database } from '../firebase/setup';
import { ref, set, push } from 'firebase/database';
import { Alert } from 'flowbite-react';

interface FormRowProps {
    data: {
        label: string;
        type: string;
        placeholder: string;
        value: string;
        onValueChange: (value: string) => void;
        id: string;
        error: string;
    }[];
}
const FormRow = ({ data }: FormRowProps) => {
    return (
        <div className='flex -mx-3 mb-3 w-full'>
            <div className='flex grow'>
                {data.map((item) => {
                    if (!item) return null;
                    const handleChange = (
                        e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                        >
                    ) => {
                        item.onValueChange(e.target.value);
                    };
                    const inputField =
                        item.type === 'textbox' ? (
                            <textarea
                                onChange={handleChange}
                                rows={3}
                                className={`appearance-none block w-full bg-gray-200 text-gray-700 ${
                                    item.error ? 'border border-red-500' : ''
                                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                id={item.id}
                                placeholder={item.placeholder}
                            />
                        ) : (
                            <input
                                onChange={handleChange}
                                className={`appearance-none block w-full bg-gray-200 text-gray-700 ${
                                    item.error ? 'border border-red-500' : ''
                                } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                id={item.id}
                                type={item.type}
                                placeholder={item.placeholder}
                            />
                        );
                    return (
                        <div className='px-3 mb-6 md:mb-0 w-full'>
                            <label
                                className='block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2'
                                htmlFor={item.id}
                            >
                                {item.label}
                            </label>
                            {inputField}
                            {item.error && (
                                <p className='text-red-500 text-xs italic'>
                                    {item.error}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const ContactPage: React.FC<PageProps> = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState({} as { [key: string]: string });
    const [userMessage, setUserMessage] = React.useState('');
    const [userMessageColor, setUserMessageColor] = React.useState('');

    const data = {
        fname: {
            label: 'First Name',
            type: 'text',
            placeholder: 'Jane',
            value: firstName,
            onValueChange: setFirstName,
            id: 'grid-first-name',
            error: errors.firstName,
        },
        lname: {
            label: 'Last Name',
            type: 'text',
            placeholder: 'Doe',
            value: lastName,
            onValueChange: setLastName,
            id: 'grid-last-name',
            error: errors.lastName,
        },
        email: {
            label: 'Email',
            type: 'email',
            placeholder: 'janedoe@gmail.com',
            value: email,
            onValueChange: setEmail,
            id: 'email',
            error: errors.email,
        },
        subject: {
            label: 'Subject',
            type: 'text',
            placeholder: '',
            value: subject,
            onValueChange: setSubject,
            id: 'subject',
            error: errors.subject,
        },
        message: {
            label: 'Message',
            type: 'textbox',
            placeholder: '',
            value: message,
            onValueChange: setMessage,
            id: 'message',
            error: errors.message,
        },
    };

    React.useEffect(() => {
        setErrors({});
    }, [firstName, lastName, email, subject, message]);

    React.useEffect(() => {
        if (userMessage) {
            setTimeout(() => {
                setUserMessage('');
            }, 3000);
        }
    }, [userMessage]);

    const validate = () => {
        const errors = {} as { [key: string]: string };
        if (!firstName) errors.firstName = 'First Name is required';
        if (!lastName) errors.lastName = 'Last Name is required';
        if (!email) errors.email = 'Email is required';
        if (!subject && !message)
            errors.message = 'Subject or message is required';
        return errors;
    };

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const formData = {
                firstName,
                lastName,
                email,
                subject,
                message,
                timestamp: new Date().toISOString(),
            };
            try {
                const newMessageRef = push(ref(database, 'contact'));
                set(newMessageRef, formData);
                setUserMessage('Message sent successfully');
                setUserMessageColor('success');
            } catch (error) {
                setUserMessage('Error sending message');
                setUserMessageColor('danger');
            }
        }
    };
    return (
        <DefaultLayout>
            <div className='h-full m-8'>
                {userMessage && (
                    <Alert color={userMessageColor} rounded={true}>
                        {userMessage}
                    </Alert>
                )}
                <div className='mt-4 flex justify-between items-center bg-white/5 rounded-lg'>
                    <div className='flex flex-col gap-6 self-start p-4'>
                        <h1 className='text-4xl font-bold text-[#03C988]'>
                            Suven Pandey
                        </h1>
                        <div>
                            <p className='mb-2'>Find me on</p>
                            <a href='https://github.com/Suven-p'>
                                <img
                                    src='/socials/github.svg'
                                    alt='Github'
                                    className='inline-block w-8 h-8 ml-2'
                                />
                            </a>
                            <a href='https://linkedin.com/in/suven-pandey'>
                                <img
                                    src='/socials/linkedin.svg'
                                    alt='Linkedin'
                                    className='inline-block w-8 h-8 ml-2'
                                />
                            </a>
                            <a href='https://twitter.com/Suvenpandey1'>
                                <img
                                    src='/socials/twitter.svg'
                                    alt='Twitter'
                                    className='inline-block w-8 h-8 ml-2'
                                />
                            </a>
                        </div>
                    </div>
                    <form
                        className='p-6 border-l border-l-white w-4/6'
                        onSubmit={formSubmitHandler}
                    >
                        <div className='flex flex-col flex-wrap mb-6'>
                            <FormRow data={[data.fname, data.lname]} />
                            <FormRow data={[data.email]} />
                            <FormRow data={[data.subject]} />
                            <FormRow data={[data.message]} />
                            <input
                                type='submit'
                                value='Send Message'
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ContactPage;

export const Head: HeadFC = () => <title>Suven Pandey</title>;
