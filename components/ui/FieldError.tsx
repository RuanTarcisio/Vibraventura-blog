interface FieldErrorProps {
    error: string | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
    if (error) {
        return <span className="text-red-900 text-sm">{error}</span>;
    }
    return null; // melhor que `false` para React
};
