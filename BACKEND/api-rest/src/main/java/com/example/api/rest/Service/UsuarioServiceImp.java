package com.example.api.rest.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.ActualizacionUsuarioFormatoTelefono;
import com.example.api.rest.Excepciones.ActualizacionUsuarioNombreVacio;
import com.example.api.rest.Excepciones.FormatoContraseñaInvalida;
import com.example.api.rest.Excepciones.FormatoCorreoInvalido;
import com.example.api.rest.Excepciones.PaginaNoEncontrada;
import com.example.api.rest.Excepciones.PropiedadNoEncontrada;
import com.example.api.rest.Excepciones.UsuarioBloqueado;
import com.example.api.rest.Excepciones.UsuarioContraseñaIncorrecta;
import com.example.api.rest.Excepciones.UsuarioCredencialesIncorrectas;
import com.example.api.rest.Excepciones.UsuarioRecuperacionContraseña;
import com.example.api.rest.Excepciones.UsuarioYaExistente;
import com.example.api.rest.Model.Comentarios;
import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Model.PropiedadesModel;
//import com.example.api.rest.Excepciones.UsuarioYaExistente;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Model.ENUM.enumsNotificaciones;
import com.example.api.rest.Repository.INotificacionesRepositorty;
import com.example.api.rest.Repository.IPropiedadesRepository;
import com.example.api.rest.Repository.IUsuarioRepository;
//ESTA CLASE NO ESTA TERMINADA
//HAY QUE TERMINARLA
@Service
public class UsuarioServiceImp implements IUsuarioService{
    
    @Autowired 
    private IUsuarioRepository usuarioRepositorio;
    
    @Autowired
    private IPropiedadesRepository propiedadesRepositorio;
    @Autowired
    private IPropiedadesService propiedadesServicio;
    @Autowired
    private INotificacionesRepositorty notificacionesRepositorio;

    @Autowired
    private EmailContraseñaRecuperada emailContraseñaRecuperada;
    
    @Override
    public UsuarioModel buscarUsuarioPorCorreo(String email) {
        Optional<UsuarioModel> usuario = usuarioRepositorio.findByEmail(email);
        return usuario.orElse(null);
    }

    @Override
    public UsuarioModel buscarUsuario(ObjectId id) {
        return usuarioRepositorio.findById(id).orElseThrow(null);
    }

    @Override
    public UsuarioModel buscarUsuarioPorUserName(String UserName) {
        Optional<UsuarioModel> usuario = usuarioRepositorio.findByUserName(UserName);
        return usuario.orElse(null);
    }

    @Override
    public String crearUsuario(UsuarioModel usuario) {  

        // Validar formato del correo electrónico
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        if (!usuario.getEmail().matches(emailRegex)) {
            throw new FormatoCorreoInvalido("El formato del correo electrónico es inválido: " + usuario.getEmail());
        }

        // Validar seguridad de la contraseña
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!usuario.getPassword().matches(passwordRegex)) {
            throw new FormatoContraseñaInvalida("La contraseña no cumple con los requisitos de seguridad: mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        }

        UsuarioModel usuarioEncontrado = buscarUsuarioPorCorreo(usuario.getEmail());
        UsuarioModel usuarioEncontradoName = buscarUsuarioPorUserName(usuario.getUserName());
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Verificar si el usuario ya existe
        if(usuarioEncontrado != null){
            throw new UsuarioYaExistente("EL usuario con el correo: "  + usuarioEncontrado.getEmail() + " ya existe verifique sus datos");
        }

        // Verificar si el nombre de usuario ya existe
        if(usuarioEncontradoName != null){
            throw new UsuarioYaExistente("El usuario con el nombre de usuario: " + usuario.getUserName() + " ya existe, inserte un nuevo nombre de usuario");
        }
        String contraseñaUsuario = usuario.getPassword(); 
        String contraseñaEncriptada = encoder.encode(contraseñaUsuario);
        usuario.setPassword(contraseñaEncriptada);
        usuarioRepositorio.save(usuario);
        return "El usuario: " + usuario.getUserName() + " ,ha sido guardado con exito";
    }
    
    @Override
    public UsuarioModel validarInicioSesion(String userName, String password) {
        UsuarioModel usuarioEncontrado = buscarUsuarioPorUserName(userName);
    
        PasswordEncoder encode = new BCryptPasswordEncoder();
        if(usuarioEncontrado == null){
            throw new UsuarioCredencialesIncorrectas("Credenciales incorrectas");
        }
        if(usuarioEncontrado.getBloqueado() == true){
            Date fechaActivacion = usuarioEncontrado.getFechaReactivacion();
            Date fechaActual = new Date();
            if(fechaActual.before(fechaActivacion)){
                throw new UsuarioBloqueado("EL usuario con el nombre: " + usuarioEncontrado.getUserName() + " se encuentra bloqueado hasta " + fechaActivacion);
            }else{
                usuarioEncontrado.setBloqueado(false);
                usuarioEncontrado.setIntentosFallidos(0);
                usuarioRepositorio.save(usuarioEncontrado);
            }
        }
        String contraseña = usuarioEncontrado.getPassword();
        boolean verificacionContraseña = encode.matches(password, contraseña);
        if(verificacionContraseña == false){
            Integer intentos = usuarioEncontrado.getIntentosFallidos() + 1;
            usuarioEncontrado.setIntentosFallidos(intentos);        
            usuarioRepositorio.save(usuarioEncontrado);
            if(usuarioEncontrado.getIntentosFallidos() == 5){
                usuarioEncontrado.setBloqueado(true);
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date());
                calendar.add(Calendar.MINUTE, 2); 
                Date fechaReactivacion = calendar.getTime();
                usuarioEncontrado.setFechaReactivacion(fechaReactivacion);
                usuarioRepositorio.save(usuarioEncontrado);
                throw new UsuarioBloqueado("El usuario: " + userName + " ha sido bloqueado, intente de nuevo dentro de dos minutos");
            }
            throw new UsuarioContraseñaIncorrecta("Contraseña incorrecta");
        }
        usuarioEncontrado.setIntentosFallidos(0);
        usuarioRepositorio.save(usuarioEncontrado);
        return usuarioEncontrado;
        
    }

    @Override
    public UsuarioModel actualizarUsuario(ObjectId id, UsuarioModel usuario) {
        UsuarioModel usuarioEncontrado = buscarUsuario(id);

        //Validar el fromato del nombre

        if(usuario.getUserName() == null || usuario.getUserName().trim().isEmpty()){
            throw new ActualizacionUsuarioNombreVacio("El nombre de usuario no puede estar vacío.");
        }
        if(!usuarioEncontrado.getUserName().equals(usuario.getUserName())){
            UsuarioModel usuarioPorUserName = buscarUsuarioPorUserName(usuario.getUserName());
            if(usuarioPorUserName != null){
                throw new UsuarioYaExistente("Cambia el nombre, ya existe un usuario con ese nombre");
            }
        }

        if(usuario.getTelefono() != ""){
            String telefonoRegex = "^[0-9]{10}$"; 
            if (!usuario.getTelefono().matches(telefonoRegex)) {
                throw new ActualizacionUsuarioFormatoTelefono("El formato del teléfono es inválido: ");
            }
        }
        //Validar el formato de la foto (en caso de que el usuario la proporcione)
    
        // Actualizar los datos del usuario
        usuarioEncontrado.setUserName(usuario.getUserName());
        usuarioEncontrado.setTelefono(usuario.getTelefono());
        usuarioEncontrado.setFoto(usuario.getFoto());
        
        return usuarioRepositorio.save(usuarioEncontrado);
    }

    @Override
    public String eliminarUsuario(ObjectId id) {
        
        //Buscamos el usuario
        UsuarioModel usuarioEncontrado = buscarUsuario(id);
        if (usuarioEncontrado == null) {
            throw new UsuarioYaExistente("El usuario no existe o no se encontró.");
        }

        //Eliminamos las publicaciones que se asocien a este usuario
        List<PropiedadesModel> publicaciones = propiedadesRepositorio.findByIdUsuarioPropietario(usuarioEncontrado.getId());
        for(int i = 0; i < publicaciones.size(); i++){
            propiedadesRepositorio.delete(publicaciones.get(i));
        }

        //Eliminamos el usuario
        usuarioRepositorio.delete(usuarioEncontrado);
        String nombre = usuarioEncontrado.getNombre();
        return "EL usuario con el nombre: " + nombre + " ,ha sido eliminado con exito";
    }

    @Override
    public String comentarPublicacion(PropiedadesModel propiedadComentario) {
        PropiedadesModel propiedadEncontrada = propiedadesServicio.buscarPropiedadPorNombre(propiedadComentario.getNombre());
        if(propiedadEncontrada == null){
            throw new PropiedadNoEncontrada("la propiedad no existe o no fue encontrada");
        }
        ObjectId idUsuarioComenta;
        String contenido;
        Date fecha;
        Comentarios comentario = new Comentarios();
        NotificacionesModel notificacion = new NotificacionesModel();
        for(int i=0; i < propiedadComentario.getComentarios().size(); i++){
            idUsuarioComenta = propiedadComentario.getComentarios().get(i).getIdUsuarioInteresado();
            contenido= propiedadComentario.getComentarios().get(i).getContenido();
            fecha = propiedadComentario.getComentarios().get(i).getFecha();
            comentario = new Comentarios(idUsuarioComenta, contenido, fecha);
            UsuarioModel usuarioDueñoPropiedad = buscarUsuario(propiedadEncontrada.getIdUsuarioPropietario());
            UsuarioModel usuarioComenta = buscarUsuario(idUsuarioComenta);
            notificacion = new NotificacionesModel(enumsNotificaciones.aviso, fecha, usuarioComenta.getUserName(), "El usuario: " + idUsuarioComenta + " ha hecho un comentario a tu publicacion.", usuarioDueñoPropiedad.getUserName());
        }
        
        propiedadEncontrada.getComentarios().add(comentario); 
        propiedadesRepositorio.save(propiedadEncontrada);
        notificacionesRepositorio.save(notificacion);

        return "Comentario a la publicacion " + propiedadEncontrada.getNombre() + " guardado con exito";
    }

    @Override
    public String recuperarContraseña(UsuarioModel usuario) {
        UsuarioModel usuarioEncontrado = buscarUsuarioPorUserName(usuario.getUserName());
        if(usuarioEncontrado == null){
            throw new UsuarioRecuperacionContraseña("Usuario no encontrado");
        }
        if(!usuarioEncontrado.getToken().equals(usuario.getToken())){
            throw new PaginaNoEncontrada("404 not found");
        }
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode(usuario.getPassword());
        usuarioEncontrado.setPassword(password);
        usuarioRepositorio.save(usuarioEncontrado);
        emailContraseñaRecuperada.sendMail(usuarioEncontrado);
        return usuarioEncontrado.getUserName()  + "Tu contraseña a sido actualizada";
    }

    @Override
    public String creacionUsuarioGoogle(UsuarioModel usuario) {
        UsuarioModel usuarioEncontradoPorEmial = buscarUsuarioPorCorreo(usuario.getEmail());
        UsuarioModel usuarioEncontradoPorUserName = buscarUsuarioPorUserName(usuario.getUserName());

        if(usuarioEncontradoPorEmial != null){
            throw new UsuarioYaExistente("El usuario con el correo: " + usuario.getEmail() + " Ya existe");
        }

        if(usuarioEncontradoPorUserName != null){
            throw new UsuarioYaExistente("El usuario con el correo: " + usuario.getUserName() + " Ya existe");
        }
        PasswordEncoder encode = new BCryptPasswordEncoder();
        String contraseñaEncriptada = encode.encode(usuario.getPassword());
        usuario.setPassword(contraseñaEncriptada);
        usuarioRepositorio.save(usuario);
        return "El usuario con el correo: " + usuario.getEmail() + " Ha sido creado con exito";
    }
}