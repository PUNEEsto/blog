
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ control, name, label }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-2">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY} // Ensure this is correct
                            value={value || ""}
                            onEditorChange={onChange}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins:
                                    "lists link charmap preview anchor searchreplace visualblocks code fullscreen media table wordcount",
                                toolbar:
                                    "undo redo | bold italic underline | link media table | numlist bullist | removeformat",
                                branding: false,
                                content_style: "body { font-family:Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </>
                )}
            />
        </div>
    );
}

RTE.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
};

