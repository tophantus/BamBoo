import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { Image, Send, SendHorizonal, X } from 'lucide-react';
import { CHAT_API } from '../api/chatAPi';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const removeImage = (e) => {
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageFile) return;
        try {
            let imageUrl = null;

            if (imageFile) {
                const res = await CHAT_API.uploadImage(imageFile);
                 imageUrl = res?.data?.imageUrl;
            }
              
            const content = {
                image: imageUrl,
                text: text.trim()
            }

            sendMessage(content);

            setText("")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            toast.error("Fail to send message")
            console.log("Fail to send message", error);
        }
    }



  return (
    <div className='p-4 w-full flex flex-col items-center'>
        {imagePreview &&(
            <div className='mb-3 flex items-center gap-2'>
                <div className='relative'>
                    <img src={imagePreview} alt="preview" className='max-w-20 object-cover rounded-lg  border border-bamboo' />
                    <button
                        onClick={removeImage}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-bamboo text-milk hover:scale-105 hover:bg-error
                        flex items-center justify-center"
                        type="button"
                    >
                        <X/>
                    </button>
                </div>
            </div>
        )}
        <form onSubmit={handleSendMessage} className='flex w-full justify-center items-center gap-2'>
            <div className='flex-row w-full justify-center items-center flex gap-2'>
                <input
                    type="text"
                    className="w-full ps-4 p-3 focus:outline-none border-2 border-paper focus:border-bamboo bg-textbox text-black placeholder:text-black placeholder:text-opacity-60 rounded-lg input-sm sm:input-md"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    className={`hidden sm:flex btn bg-textbox btn-circle border-none hover:scale-105
                            ${imagePreview ? "bg-bamboo" : "text-black"}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image size={20} />
                </button>
            </div>
            <button
                type="submit"
                className={`hidden sm:flex  bg-textbox p-2.5 rounded-full disabled:bg-textbox hover:scale-105 border-none hover:scale-105 text-black ${(!text.trim() && !imagePreview) ? "cursor-not-allowed  opacity-60" : ""}`}
                disabled={!text.trim() && !imagePreview}
            >
                <SendHorizonal size={22} />
            </button>
        </form>
    </div>
  )
}

export default MessageInput