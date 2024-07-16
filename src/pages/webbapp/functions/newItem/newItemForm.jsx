import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';

const NewItemForm = ({ onClose, onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const submitForm = (data) => {
        onSubmit(data);
        reset(); // Reset form fields after submission
    };

    return (
        <div className="new-item-form">
            <form onSubmit={handleSubmit(submitForm)}>
                <label>ID:</label>
                <input type="text" {...register('id', { required: true })} />
                {errors.id && <span className="error">ID is required</span>}

                <label>Date:</label>
                <input type="text" {...register('date', { required: true })} />
                {errors.date && <span className="error">Date is required</span>}

                <label>Content:</label>
                <input type="text" {...register('content', { required: true })} />
                {errors.content && <span className="error">Content is required</span>}

                <label>Amount:</label>
                <input type="number" {...register('amount', { required: true, min: 0 })} />
                {errors.amount && <span className="error">Amount is required and must be a positive number</span>}

                <div className="form-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NewItemForm;
