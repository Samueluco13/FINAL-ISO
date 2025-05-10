package com.example.api.rest.Excepciones;

public class ImagenesInvalido extends RuntimeException{
    public ImagenesInvalido(String imagen){
        super(imagen);
    }
}