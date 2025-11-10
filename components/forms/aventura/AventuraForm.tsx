'use client';

import { useAventuraForm } from '@/hooks/useAventuraForm';
import { Form } from '@/components/ui/Form';
import { InformacoesBasicasStep } from './form-steps/InformacoesBasicasStep';
import { ImagensMediaStep } from './form-steps/ImagensMediaStep';
import { DatasRecorrenciaStep } from './form-steps/DatasRecorrenciaStep';
import { LocalidadePrecoStep } from './form-steps/LocalidadePrecoStep';
import { RestricoesRoteiroStep } from './form-steps/RestricoesRoteiroStep';
import { PoliticasFinalizacaoStep } from './form-steps/PoliticasFinalizacaoStep';
import { FormNavigation } from './FormNavigation';

export function AventuraForm() {
    const { methods, currentStep, steps, nextStep, prevStep, isFirstStep, isLastStep } = useAventuraForm();

    const onSubmit = (data: any) => {
        console.log('Dados da aventura:', data);
        // Aqui você faria a submissão para a API
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <InformacoesBasicasStep />;
            case 1:
                return <ImagensMediaStep />;
            case 2:
                return <DatasRecorrenciaStep />;
            case 3:
                return <LocalidadePrecoStep />;
            case 4:
                return <RestricoesRoteiroStep />;
            case 5:
                return <PoliticasFinalizacaoStep />;
            default:
                return null;
        }
    };

    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                                    }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    {renderStep()}
                </div>

                {/* Navigation */}
                <FormNavigation
                    currentStep={currentStep}
                    steps={steps}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPrev={prevStep}
                    onNext={nextStep}
                    isLoading={methods.formState.isSubmitting}
                />
            </form>
        </Form>
    );
}