import { applyDecorators, Type } from '@nestjs/common';
import {ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath} from '@nestjs/swagger';

export function ApiOkEnvelope<TModel extends Type<any>>(model: TModel) {
    return applyDecorators(
        ApiExtraModels(model),
        ApiOkResponse({
            schema: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: getSchemaPath(model) },
                },
            },
        }),
    );
}

export function ApiOkEnvelopeArray<TModel extends Type<any>>(model: TModel) {
    return applyDecorators(
        ApiExtraModels(model),
        ApiOkResponse({
            schema: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: getSchemaPath(model) } },
                },
            },
        }),
    );
}

export const ApiBadRequestEnvelope = (message = 'Bad request') =>
    ApiResponse({
        status: 400,
        description: message,
        schema: {
            example: {
                success: false,
                error: { status: 400, message },
                meta: {
                    path: '/api/v1/...',
                    method: 'PATCH',
                    timestamp: '2025-11-06T12:00:00.000Z',
                },
            },
        },
    });

export const ApiNotFoundEnvelope = (message = 'Not found') =>
    ApiResponse({
        status: 404,
        description: message,
        schema: {
            example: {
                success: false,
                error: { status: 404, message },
                meta: {
                    path: '/api/v1/...',
                    method: 'GET',
                    timestamp: '2025-11-06T12:00:00.000Z',
                },
            },
        },
    });

